import { ModalRef } from './modalref.class';

describe('ModalRef', () => {
  afterEach(() => vi.useRealTimers());

  it('emits its result, detaches, and destroys the component once', () => {
    vi.useFakeTimers();
    const ref = new ModalRef<string>();
    const component = { destroy: vi.fn() } as any;
    const detach = vi.fn();
    const closed = vi.fn();
    ref.closed.subscribe(closed);
    ref._setup(component, detach);

    ref.close('confirmed');
    ref.close('ignored');
    vi.runAllTimers();

    expect(closed).toHaveBeenCalledOnce();
    expect(closed).toHaveBeenCalledWith('confirmed');
    expect(detach).toHaveBeenCalledOnce();
    expect(component.destroy).toHaveBeenCalledOnce();
  });

  it('does nothing when closed before setup', () => {
    vi.useFakeTimers();
    const ref = new ModalRef();
    const closed = vi.fn();
    ref.closed.subscribe(closed);

    ref.close();
    vi.runAllTimers();

    expect(closed).not.toHaveBeenCalled();
  });
});
