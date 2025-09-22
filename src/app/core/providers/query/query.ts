import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, getDoc, updateDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class Query {

  constructor(
    private readonly fst: Firestore,
  ) {}

  async create(collectionName: string, data: any) {
    try {
      const ref = collection(this.fst, collectionName);
      const res = await addDoc(ref, data);
    } catch (error) {
      console.log(error);
    }
  }

  async set(collectionName: string, uid: string, data: any) {
    try {
      const ref = doc(this.fst, collectionName, uid);
      await setDoc(ref, data);
    } catch (error) {
      console.log(error);
    }
  }

  async get(collectionName: string, uid: string) {
    try {
      const ref = doc(this.fst, collectionName, uid);
      const snaphot = await getDoc(ref);
      if(snaphot.exists()) {
        return snaphot.data();
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async update(collectionName: string, uid: string, data: any) {
    try {
      const ref = doc(this.fst, collectionName, uid);
      await updateDoc(ref, data);
    } catch (error) {
      console.log(error);
    }
  }
  
}
