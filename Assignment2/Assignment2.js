class EventEmitter {
    constructor() {
        this.listeners = {};
    }

    on(eventName, listener) {
        this.listeners[eventName] = this.listeners[eventName] || [];
        this.listeners[eventName].push(listener);
    }

    emit(eventName, data) {
        (this.listeners[eventName] || []).forEach((listener) => listener(data));
    }
}

class StudentActivityMonitor extends EventEmitter {
    constructor() {
        super();
    }

    login(studentId) {
        this.emit('login', studentId);
    }

    submitAssignment(studentId, assignmentId) {
        this.emit('assignment', { studentId, assignmentId });
    }

    logout(studentId) {
        this.emit('logout', studentId);
    }

    exit(studentId) {
        this.emit('exit', studentId);
    }
}

if (typeof module !== 'undefined') module.exports = StudentActivityMonitor;

if (typeof document !== 'undefined') {
const monitor = new StudentActivityMonitor();
const message = document.getElementById('message');

const eventDetails = {
    login: 'student logged successfully',
    assignment: 'assignment submitted',
    logout: 'student logged out',
    exit: 'exiting the system'
};

function recordActivity(eventName) {
    message.textContent = eventDetails[eventName];
}

monitor.on('login', () => recordActivity('login'));
monitor.on('assignment', () => recordActivity('assignment'));
monitor.on('logout', () => recordActivity('logout'));
monitor.on('exit', () => recordActivity('exit'));

document.getElementById('loginBtn').addEventListener('click', () => monitor.login('student'));
document.getElementById('assignmentBtn').addEventListener('click', () => monitor.submitAssignment('student', 'assignment'));
document.getElementById('logoutBtn').addEventListener('click', () => monitor.logout('student'));
document.getElementById('exitBtn').addEventListener('click', () => monitor.exit('student'));
}

