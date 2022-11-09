
import React, { Component } from 'react';
import Vehicle  from './Vehicle';

class VehiculosInDb extends Component  {
    constructor(){
        super()
        this.state = {
            vehicleList:[],
        }
    }

    componentDidMount(){
        fetch('http://localhost:3050/api/products')
            .then(respuesta =>{
                return respuesta.json()
            })
            .then(products =>{
                this.setState({vehicleList: products.data})
            })
            .catch(error => console.log(error))

    }

    render(){
        return (
            <React.Fragment>
                    {/*<!-- Categories in DB -->*/}
                    <div className="col-lg-6 mb-4">						
                        <div className="card shadow mb-4">
                            <div className="card-header py-3">
                                <h6 className="m-0 font-weight-bold text-gray-800">Products</h6>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    {    
                                        this.state.vehicleList.map((vehicle,index)=>{
                                           
                                            return  <Vehicle  {...vehicle}  key={index} />
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
               
            </React.Fragment>
        )
    
    }

}



export default VehiculosInDb;