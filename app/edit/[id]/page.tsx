"use client"
import react, {useEffect, useState } from "react"
import { useRouter } from "next/navigation";
const EditPage=({params}:{params:Promise<{id:string}>})=>{
    const router=useRouter()
    const {id}=react.use(params);
     
    type user={
        name:string;
        age:string;
        country:string;
        id:string;
    }
      
    const[data,setData]=useState<user|null>(null);

  useEffect(()=>{
          const getUser=async()=>{
               try{
                 const res=await fetch(`https://6883b6f921fa24876a9ef48e.mockapi.io/users/${id}`);
                 if(!res.ok){
                    throw new Error(`status:${res.status}`)
                 }
                 const data=await res.json();
                 if(data){
                    setData(data);
                 }
               }catch(err){
                  console.error("failed to fetch user data: ",err);
                  
               }
        }
        getUser()
    },[id])

    const handleChange=(e:react.ChangeEvent<HTMLInputElement>)=>{
       if(data){
         setData({...data,[e.target.name]:e.target.value})
       } 
    }

    const handleClick=async(e:react.MouseEvent<HTMLInputElement>)=>{
        const v=e.currentTarget.value;
         if(v==="Update" && data){
                const res=await fetch(`https://6883b6f921fa24876a9ef48e.mockapi.io/users/${id}`,{
                method:'PUT',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(data)
        }) 
              router.push('./show')
             // setData({ name: "", age: "", country: "", id: "" })
        
        }else if(v==="Cancel"){
            router.push('/show')
        }
        
    }

    if(!data){
        return(
            <p>data is loading</p>
        )
    }
    return(
        <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[1.8rem] font-bold "><span className="text-red-600 text-[2rem] ">E</span>dit</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam eum tenetur tempore accusantium sed. Autem simriores repellendus .</p>
            <div className="input-field">
                <input type="text" placeholder="Enter Name" name="name" value={data.name}  onChange={handleChange}/>
                <input type="number" placeholder="Enter Age" name="age" value={data.age}   onChange={handleChange}/>
                <input type="text" placeholder="Enter Country" name="country" value={data.country}  onChange={handleChange}/>
                <input type="button" value="Update" onClick={handleClick} />
                <input type="button" value="Cancel" onClick={handleClick} />
            </div>
          
        </div>
    )
}
export default EditPage
