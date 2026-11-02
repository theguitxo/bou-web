import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { GameComponent } from './game.component';
import { GameService } from '../../core/services/game.service';
import { ModalService } from '../../core/services/modal.service';

describe('GameComponent', () => {
  let allPlayed: BehaviorSubject<boolean>;
  let checking: BehaviorSubject<boolean>;
  let closed: Subject<{ leftButton: boolean }>;
  let game: {
    allPlayed: BehaviorSubject<boolean>;
    chekingFirePoint: BehaviorSubject<boolean>;
    isPlaying: boolean;
    generateGame: ReturnType<typeof vi.fn>;
  };
  let router: { navigate: ReturnType<typeof vi.fn> };
  let modal: {
    open: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    allPlayed = new BehaviorSubject(false);
    checking = new BehaviorSubject(false);
    closed = new Subject<{ leftButton: boolean }>();
    game = {
      allPlayed,
      chekingFirePoint: checking,
      isPlaying: true,
      generateGame: vi.fn(),
    };
    router = { navigate: vi.fn() };
    modal = {
      open: vi.fn(() => ({
        closed: closed.asObservable(),
        close: vi.fn(),
      })),
    };

    await TestBed.configureTestingModule({
      imports: [GameComponent],
      providers: [
        { provide: GameService, useValue: game },
        { provide: Router, useValue: router },
        { provide: ModalService, useValue: modal },
      ],
    })
      .overrideComponent(GameComponent, {
        set: {
          template: '<button (click)="checkExitGameModal()">Exit</button>',
        },
      })
      .compileComponents();
  });

  it('generates a game when a game is already in progress', () => {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance).toBeTruthy();
    expect(game.generateGame).toHaveBeenCalledOnce();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('navigates home without generating a game when no game is in progress', () => {
    game.isPlaying = false;

    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();

    expect(game.generateGame).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledOnce();
  });

  it('confirms an unfinished exit and navigates home when accepted', () => {
    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();

    expect(modal.open).toHaveBeenCalledOnce();
    expect(router.navigate).not.toHaveBeenCalled();

    closed.next({ leftButton: true });

    expect(router.navigate).toHaveBeenCalled();
  });

  it('navigates home directly when all points have been played', () => {
    allPlayed.next(true);

    const fixture = TestBed.createComponent(GameComponent);
    fixture.detectChanges();
    fixture.nativeElement.querySelector('button').click();

    expect(modal.open).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledOnce();
  });
});
