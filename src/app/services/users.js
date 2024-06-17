import { getCountFromServer, orderBy } from "firebase/firestore";
import { db, collection, addDoc, getDocs, query, where, deleteDoc, doc, setDoc, getDoc, createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut, auth } from "./api";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const collectionName = 'users';

export const access = async (name) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef, where('name', '==', name)));
    if (result.size === 0) {
        const a = await addDoc(colRef, { name });
        return a.id;
    }
    return result.docs[0].id;
}
export const setUser = async (id, name) => {
    const docRef = doc(db, 'users', id);
    await setDoc(docRef, { name });
    return id;
}
export const signUp = async (name, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    sendEmailVerification(userCredential.user);
    const user = userCredential.user;
    return setUser(user.uid, name);
}

export const signIn = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user.uid;
}

export const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider).then(async result => {
        const user = await getUserById(result.user.uid);
        if (!user) {
            setUser(result.user.uid, result.user.displayName);
        }
        return result.user;
    });
}

export const getCurrentUserId = async () => await auth.currentUser?.uid;
export const logout = async () => await signOut(auth);

export const getUsers = async (id) => {
    const colRef = collection(db, collectionName);
    const result = await getDocs(colRef);
    return getArrayFromCollection(result).filter(user => user.id !== id);
}

export const getTasksByUserId = async (userId) => {
    const colRef = collection(db, collectionName, userId, 'tasks');
    const result = await getDocs(colRef);
    return getArrayFromCollection(result);
}

export const createTask = async (idUser, obj) => {
    const colRef = collection(db, collectionName, idUser, 'tasks');
    const data = await addDoc(colRef, obj);
    return data.id;
}


export const deleteTarea = async (idUser, idTarea) => {
    const docRef = doc(db, collectionName, idUser, 'tasks', idTarea);
    await deleteDoc(docRef);
}

export const updateTask = async (idUser, idTarea, obj) => {
    const docRef = doc(db, collectionName, idUser, 'tasks', idTarea);
    await setDoc(docRef, obj);
}

export const createHilo = async (obj) => {
    const colRef = collection(db, 'hilos');
    const result = await getDocs(query(colRef, where('title', '==', obj.title)));
    if (result.size === 0) {
        const a = await addDoc(colRef, obj);
        return a.id;
    }
    return null;
}

export const getHilos = async () => {
    const colRef = collection(db, 'hilos');
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
}

export const getHiloById = async (id) => {
    const docRef = doc(db, 'hilos', id);
    const result = await getDoc(docRef);
    return result.data();
}

export const deleteHilo = async (id) => {
    const docRef = doc(db, 'hilos', id);
    await deleteDoc(docRef);
}

export const getUserById = async (id) => {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    var data = result.data();
    if (!data) {
        return null;
    }
    data.id = result.id;
    return data;
}

export const getCommentsCountByHiloId = async (id) => {
    const colRef = collection(db, 'hilos', id, 'comments');
    //Get comments count
    const snapshot = await getCountFromServer(colRef);
    return snapshot.data().count;
}


export const getCommentsByHiloId = async (hiloId) => {
    const colRef = collection(db, 'hilos', hiloId, 'comments');
    const result = await getDocs(query(colRef, orderBy('date', 'desc')))
    return getArrayFromCollection(result);
}

export const createComment = async (idHilo, obj) => {
    const colRef = collection(db, 'hilos', idHilo, 'comments');
    const data = await addDoc(colRef, obj);
    return data.id;
}

export const deleteComment = async (idHilo, idComment) => {
    const docRef = doc(db, 'hilos', idHilo, 'comments', idComment);
    await deleteDoc(docRef);
}

const getArrayFromCollection = (collection) => {
    return collection.docs.map(doc => {
        return { ...doc.data(), id: doc.id };
    });
}