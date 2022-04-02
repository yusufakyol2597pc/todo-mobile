import { TodoStatus } from "../enums/todoStatus";
import { TodoType } from "../enums/todoType";
import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore"; 
import { auth, db } from "../../firebase";
import Toast from 'react-native-toast-message';
import { useDispatch } from "react-redux";
import { closeConfirmDialog } from "../actions/global.actions";

export class Todo {
    title: string;
    status: TodoStatus;
    type: TodoType;
    date: Date;

    constructor(title: string, status: TodoStatus = TodoStatus.NOT_STARTED, type: number = 0, date: Date = new Date()) {
        this.title = title;
        this.status = status;
        this.type = type;
        this.date = date;
    }

    save() {
        // Add a new document with a generated id
        addDoc(collection(db, "todo"), {
            title: this.title,
            status: this.status,
            type: this.type,
            date: this.date,
            userId: auth.currentUser?.uid,
        })
        .then(() => {
        });
    }
}