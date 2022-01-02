import firebase from "./firebase";
import {getDatabase, ref, push, set, onValue ,query, remove, child,
update} from "firebase/database";
import { useEffect, useState } from "react";
import { successNote } from "./customTostify";

export const addInfo=(info)=>{
    const db=getDatabase();
    const userRef=ref(db, "contact")
    const newUserRef =push(userRef)
    set(newUserRef,{
        username:info.username,
        phoneNumber:info.phoneNumber,
        gender:info.gender
    })
    successNote("Successfully added");
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
            //send to an array in database
            const contactArray=[];
            for (let id in contacts){
                contactArray.push({id,...contacts[id]})
            }
            setContactList(contactArray)
            setIsLoading(false)

        })
    },[]);
    return {isLoading, contactList}
}

export const deleteInfo=(id)=>{
    const db=getDatabase();
    // const userRef=ref(db, "contact")
    remove(ref(db, "contact/" +id ))
    successNote("Deleted")
}

export const updateInfo=(info)=>{
    const db=getDatabase();
    const newUserKey=push(child(ref(db), "contact/")).key
    const updates={};
    updates["contact/"+newUserKey]=info;
    return update(ref(db), updates)
}