import "./firebase";
import { useState,useEffect } from "react";
import { getDatabase,ref,push,set, onValue,query,remove ,child,update } from "firebase/database"
import { successNote } from "./customTostify";


export const addInfo=(info)=>{
    const db=getDatabase();
    const userRef=ref(db,"contact")
    const newUserRef=push(userRef)
    set(newUserRef,{
        username:info.username,
        phoneNumber:info.phoneNumber,
        gender:info.gender
    });
    successNote("Added successfully")
}

export const useFetch=()=>{
    const [contactList, setContactList] = useState();
    const [isLoading,setIsLoading]=useState(false)
    useEffect(()=>{
      setIsLoading(true)

      const db = getDatabase();
      const userRef = ref(db, 'contact');
  
      onValue(query(userRef), snapshot => {
        const contact=snapshot.val()
        // send an array of the values in database
        const contactArray = [];
        for (let id in contact) {
          contactArray.push({ id, ...contact[id] });
        }
        setContactList(contactArray);
        setIsLoading(false)
      })
    },[]);
    return {isLoading,contactList};
}


export const updateInfo=(info)=>{
    const db = getDatabase();
    const newUserKey=push(child(ref(db),"contact/")).key;
    const updates={};
    updates["contact/"+newUserKey]=info;
    successNote("Successfully deleted")
    return update(ref(db),updates);
}

export const deleteInfo=(id)=>{
  const db = getDatabase();
  remove(ref(db, "contact/"+id));
  successNote("Successfully deleted")
}
