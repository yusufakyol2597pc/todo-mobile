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
    index: number;

    constructor(title: string, status: TodoStatus = TodoStatus.NOT_STARTED, type: TodoType = TodoType.DAILY, date: Date = new Date(), index: number = 0) {
        this.title = title;
        this.status = status;
        this.type = type;
        this.date = date;
        this.index = index;
    }

    async save() {
        // Add a new document with a generated id
        return addDoc(collection(db, "todo"), {
            title: this.title,
            status: this.status,
            type: this.type,
            date: this.date,
            userId: auth.currentUser?.uid,
            index: this.index
        })
    }
}