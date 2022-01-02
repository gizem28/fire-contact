import firebase from "./firebase";
import {getDatabase, ref, push, set, onValue ,query} from "firebase/database";
import { useEffect, useState } from "react";

export const addInfo=(info)=>{
    const db=getDatabase();
    const userRef=ref(db, "contact")
    const newUserRef =push(userRef)
    set(newUserRef,{
        username:info.username,
        phoneNumber:info.phoneNumber,
        gender:info.gender
    })
    console.log("veri eklendi");
};

export const useFetch=()=>{
    const [isLoading, setIsLoading]=useState();
    const [contactList, setContactList]= useState();

    useEffect(()=>{
        setIsLoading(true)
        const db=getDatabase();
        const userRef=ref(db, "contact")

        onValue(query(userRef),snapshot=>{

            const contacts=snapshot.val()
            const contactArray=[];
            for (let id in contacts){
                contactArray.push({id,...contacts[id]})
            }
            setContactList(contactArray)

        })
    },[]);
    return {isLoading, contactList}
}