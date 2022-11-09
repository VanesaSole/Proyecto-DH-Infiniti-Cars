import React,{useState,useEffect} from "react";
import SmallCard from './SmallCard';

function ContentRowTop(){

    const [totalproducts, setTotalproducts]= useState(["Total de productos"]);

    const fetchTotalproducts = async () => {
        const res = await fetch("http://localhost:3050/api/products/", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const productoArr = await res.json()
        setTotalproducts(productoArr.total)
    }
    useEffect(()=>{
        fetchTotalproducts()
    },[])
    let productInDataBase = {
        color:   "primary",
        titulo: "Total de productos",
        valor: totalproducts,
        icono: "fas fa-car",
    }


    //total de usuarios//

    const [totalusers, setTotalusers]= useState(["Total de usuarios"]);

    const fetchTotalusers = async () => {
        const res = await fetch("http://localhost:3050/api/users/", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const usersArr = await res.json()
        setTotalusers(usersArr.info.count)
    }
    useEffect(()=>{
        fetchTotalusers()
    },[])
    let user ={
        color:   "success",
        titulo: "Total de usuarios",
        valor: totalusers,
        icono: "fas fa-user",
    }

    //total de categorias//

    const [totalcategories, setTotalcategories]= useState(["Total de categorias"]);

    const fetchTotalcategories = async () => {
        const res = await fetch("http://localhost:3050/api/products/", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        const categoriesArr = await res.json()
        setTotalcategories(categoriesArr.countByCategory.length)
    }
    useEffect(()=>{
        fetchTotalcategories()
    },[])
    let amount = {
        color:   "warning",
        titulo: "Total de categorias",
        valor: totalcategories,
        icono: "fas fa-cat",
    }

    let cardProps = [productInDataBase,user,amount];

    return (
        <React.Fragment>
        {/*<!-- Content Row -->*/}
        <div className="row">
            {
                cardProps.map((producto,index)=>{
                    return <SmallCard  {...producto}  key= {index}/>
                })
            }      
        </div>
        </React.Fragment>
    )
}
export default ContentRowTop;



























