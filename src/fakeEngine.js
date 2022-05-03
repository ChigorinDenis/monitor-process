import store from "./store";
import { updateTasks } from "./reducers/taskReducer";

function createData(id, operation, timeStart, duration) {
  return { id, operation, timeStart, duration };
}

const data = [
  createData(1, 'Выгрузка, проверка и приемка сопроводительной документации на изделия', '00.00', '06.00'),
  createData(2, 'Внешний осмотр вагонов и их пломбировки, приемка комплектующих изделий', '02.00', '06.00'),
  createData(3, 'Выгрузка, проверка и приемка сопроводительной документации на изделия', '00.00', '06.00'),
  createData(4, 'Подготовка (смазка), паранитовых прокладок', '08.05', '01.00'),
];
// const data = [
//   { 
//     id: 1,
//     operation: 'Task 1',
//     duration: '02.00',
//     timeStart: '00.00',
//     // progress: '00.30'
//   },
//   { 
//     id: 2,
//     operation: 'Task 2',
//     duration: '05.00',
//     timeStart: '01.00',
//     // progress: '05.00'
//   },
//   { 
//     id: 3,
//     operation: 'Task 3',
//     duration: '05.30',
//     timeStart: '02.30',
//     // progress: '01.30'
//   },
//   { 
//     id: 4,
//     operation: 'Task 4',
//     duration: '02.30',
//     timeStart: '05.30',
//     // progress: '01.00'
//   },
// ];
const hoursToMinutes = (time) => {
  const [hours, minutes] = time.split('.').map(Number);
  return hours * 60 + minutes;
}

const MinutesSixHundredFaster = (time) => (hoursToMinutes(time) * 100);

const MinutesToFormat = (timeFast) => {
  const min = timeFast / 100;
  const minutes = min % 60;
  const hours = (min - minutes) / 60;
  const minutesStr = minutes < 10 ? `0${minutes}`: minutes;
  const hoursStr = hours < 10 ? `0${hours}`: hours;
  return `${hoursStr}.${minutesStr}`;
}

function FakeEngine() {
  this.tasks = [];
  this.addTask = function(task) {
    const { timeStart, duration, operation, id } = task;
    const newTask = new Task(timeStart, duration, operation, id);
    this.tasks.push(newTask);
  }
  this.postRunTask = function(id) {
    alert(`Запустить задачу ${id}?`);
    const [task] = this.tasks.filter((task) => task.id === id);
    task.runTask();
  }
  this.postStopTask = function(id) {
    alert(`Вы уверены что хотите остановить задачу ${id}?`);
    const [task] = this.tasks.filter((task) => task.id === id);
    task.stopTask(); 
  }
  this.run = function() {
    const delta = 1000;
    setInterval(() => {
      this.tasks
        .map((task) => {
          task.updateTimeTask(delta);
        });
      store.dispatch(updateTasks(this.getTasks()));
    }, delta);
  }
  this.getTasks = function() {
    const tasks = this.tasks
      .map(({ timeStart, duration, operation, id, progress, state }) => (
        { timeStart, duration, operation, id, progress, state}
      ));
    return tasks;
  }
}
function Task(timeStart, duration, operation, id) {
  this.timeStart = timeStart;
  this.duration = duration;
  this.operation = operation;
  this.progress = '00.00'
  this.id = id;
  this.state = null;
  this.runTask = function() {
    this.state = 'runned';
  }
  this.stopTask = function() {
    this.state = 'stoped';
  }
  this.finishTask = function() {
    this.state = 'finished';
  }
  this.updateTimeTask = function(deltaTime) {
    if (this.state === 'runned') {
      const progressMinutes = MinutesSixHundredFaster(this.progress) + deltaTime;
      this.progress = MinutesToFormat(progressMinutes);
    }
    if (this.progress === this.duration) {
      this.finishTask();
    }
  }
}

const engine = new FakeEngine();
data.map((task) => engine.addTask(task));

export default engine;
