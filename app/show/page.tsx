"use client"
import react, { useEffect,useState,useReducer} from "react";
import { useRouter } from "next/navigation";
type user={
    name:string;
    age:string;
    country:string;
    id:string;
}
const Show=()=>{
    const router=useRouter();
    const[records,setRecords]=useState<user[]>([])
    const[error,setError]=useState("")
    const handleEdit=(id:string)=>{
        router.push(`./edit/${id}`)
    }
     const getUser=async()=>{
               try{
                 const res=await fetch('https://6883b6f921fa24876a9ef48e.mockapi.io/users');
                 if(!res.ok){
                    throw new Error(`status:${res.status}`)
                 }
                 const data:user[]=await res.json();
                 setRecords(data);
               }catch(err){
                  console.error("failed to fetch user data: ",err);
                  setError("Failed to load user data. Please try again later.")
               }
        }
    useEffect(()=>{
        getUser()
    },[])

    const handleDel=async(id:string)=>{
       try{
           const res=await fetch(`https://6883b6f921fa24876a9ef48e.mockapi.io/users/${id}`,{ method:"DELETE"});
           if(!res.ok){
               throw new Error(`failed to delete user: status ${res.status}`)
           }
            console.log(`User with ID ${id} deleted successfully. Re-fetching data...`);
            getUser()
       }catch(err){
            console.error("An error occurred during deletion:", err);
            setError("Could not delete user. Please try again.");
       }
      
    }


     if (error) {
        return (
            <div className="max-w-[1200px] mx-auto p-4">
                <p className="text-red-600 font-semibold">Error: {error}</p>
            </div>
        );
    }
    
    if(records.length===0){
        return(
            <p>Records not found!</p>
        )
    }

    return(
        <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[1.8rem] font-bold "><span className="text-red-600 text-[2rem] ">S</span>how</h2>
            <p>Lorem ipsum dquaerat nam commodi, inventore voluptatibus? Ex temporibus nisi possimus architectotur. Nostrum maiores alias ut excepturi assumenda neque eum soluta tempora saepe amet, veritatis dolor atque illum quo magnam corporis rem.</p>
             
                
               <div className="grid grid-cols-4 gap-[2rem] ">
                 {
                  
                     records.map((row)=>{
                    return(
                        <div key={row.id} className="bg-gray-300  h-[230px] rounded-[10px] shadow-md shadow-gray-600  text-center py-[1.3rem] px-[1rem] relative">
                            <h1 className="font-bold">{row.name}</h1>
                            <p>{row.age}</p>
                            <p>{row.country}</p>
                            <div className="absolute bottom-2 left-0 right-0 ">
                                <input type="button" value="X" className="border-e-1 w-[5rem] bg-red-400 font-bold py-1" onClick={()=>handleDel(row.id)}/>
                                <input type="button" value="Edit" className=" w-[5rem] bg-red-400 font-bold py-1 "onClick={()=>handleEdit(row.id)}/>
                            </div>
                        </div>
                    )
                   })  
                  
                
                }
               </div>
        </div>
    )
}
export default Show