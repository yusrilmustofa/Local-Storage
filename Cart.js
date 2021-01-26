import React, { Component } from 'react'
import $ from 'jquery'
class Cart extends Component {
    constructor() {
        super()
        this.state = {
            cart: [], //menyimpan list cart
            user: "", //menyimpan data nama user
            total: 0, //menyimpan data total belanja
            nama: "",
            jumlahbeli: 0,
            harga: 0,
        }
    }
    initCart = () => {
        //memanggil data cart pada local Storage
        let tempCart = []
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
        }
        //memanggil data user pada local storage
        let userName = localStorage.getItem("user")

        //kalkulasi harga
        let totalHarga = 0;
        tempCart.map(item => {
            totalHarga += (item.harga * item.jumlahbeli)
        })
        //memassukan data cart user dan total
        this.setState({
            cart: tempCart,
            user: userName,
            total: totalHarga
        })
    }
    componentDidMount() {
        this.initCart()
    }
    render() {
        return (
            <div className="container">
                <div className="card col-12 mt-2">
                    <div className="card-header bg-primary text-white">
                        <h4>Data Keranjang Belanja</h4>
                    </div>

                    <div className="card-body">
                        <h5 className="text-primary">
                            Nama User: {this.state.user}
                        </h5>

                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Nama Item</th>
                                    <th>Harga</th>
                                    <th>Qty</th>
                                    <th>Total</th>
                                    <th> Control</th>

                                </tr>
                            </thead>

                            <tbody>
                                {this.state.cart.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.nama}</td>
                                        <td>Rp {item.harga}</td>
                                        <td>{item.jumlahbeli}</td>
                                        <td>
                                            Rp {item.harga * item.jumlahbeli}
                                        </td>
                                        <td>{/* button untuk mengedit */}
                                            <button className="btn btn-primary btn-sm m-1 form-control" onClick={this.props.onEdit}> Edit</button>
                                            {/* button untuk menghapus */}
                                            <button className="btn btn-warning btn-sm m-1 form-control" onClick={this.props.onDrop}> Hapus</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h4 className="text-danger">
                            Total Harga: Rp {this.state.total}
                        </h4>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;