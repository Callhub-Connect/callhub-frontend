class Observable {
    constructor() {
      this.observers = [];
    }
  
    addObserver(observer) {
      this.observers.push(observer);
    }
  
    removeObserver(observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }
  
    notifyObservers(data) {
      this.observers.forEach((observer) => {
        observer(data);
      });
    }
  }
  
  export default Observable;
  