"use client"
import react, {useState } from "react"
const Input=()=>{
    const[data,setData]=useState({name:"",age:"",country:""});
    const handleChange=(e:react.ChangeEvent<HTMLInputElement>)=>{
       setData({...data,[e.target.name]:e.target.value})
        
    }
    const handleSave=async()=>{
        const res=await fetch(`https://6883b6f921fa24876a9ef48e.mockapi.io/users`,{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(data)
        }) 
        
        setData({name:"",age:"",country:""})
        
    }
    return(
        <div className="max-w-[1200px] mx-auto">
            <h2 className="text-[1.8rem] font-bold "><span className="text-red-600 text-[2rem] ">I</span>nput</h2>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam eum tenetur tempore accusantium sed. Autem simriores repellendus similique saepe perferendis aliquid at consequatur. Nostrum maiores alias ut excepturi assumenda neque eum soluta tempora saepe amet, veritatis dolor atque illum quo magnam corporis rem.</p>
            <div className="input-field">
                <input type="text" placeholder="Enter Name" name="name" value={data.name}  onChange={handleChange}/>
                <input type="number" placeholder="Enter Age" name="age" value={data.age}   onChange={handleChange}/>
                <input type="text" placeholder="Enter Country" name="country" value={data.country}  onChange={handleChange}/>
                <input type="button" value="Add Data" onClick={handleSave} />
            </div>
          
        </div>
    )
}
export default Input