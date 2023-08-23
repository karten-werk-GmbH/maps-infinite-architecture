export default class Observable {
  _value = null;
  observers = [];

  constructor(initialValue) {
    this._value = initialValue;
  }

  set value(newValue) {
    this._value = newValue;
    this.notify();
  }

  get value() {
    return this._value;
  }

  subscribe(func) {
    this.unsubscribe(func);
    this.observers.push(func);
  }

  //important to not have duplicated observer functions.
  unsubscribe(func) {
    this.observers = this.observers.filter(
      (observer) => observer.toString() !== func.toString(),
    );
  }

  notify() {
    this.observers.forEach((observer) => observer(this._value));
  }
}
