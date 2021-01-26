import React, { Component } from 'react'
import CardBelanja from '../Components/CardBelanja'
import Cart from '../pages/Cart'
import $ from 'jquery';
class Belanja extends Component {
    constructor() {
        super()
        this.state = {
            belanja: [
                {
                    nama: "Susu Bubuk", jumlahbeli: 2, harga: 95000, total: 190000,
                    cover: "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/4/22278734/22278734_ca481636-e24c-4c86-b978-2da6f7309009_700_700.jpg"
                },
                {
                    nama: "Susu Kaleng", jumlahbeli: 1, harga: 80000, total: 80000,
                    cover: "https://s0.bukalapak.com/img/50660935831/large/susu_Bendera_Frisian_Flag_kental_manis___1_dus_isi_48_kaleng.jpg"
                },
                {
                    nama: "Ice Cream", jumlahbeli: 1, harga: 9000, total: 9000,
                    cover: "https://images.herzindagi.info/image/2020/Jun/chocolate-parle-g-ice-cream.jpg"
                },

            ],
            action: "",
            nama: "",
            harga: 0,
            jumlahbeli: 0,
            total: 0,
            cover: "",
            selectedItem: null
        }
    }
    Add = () => {
        $("#modal_belanja").modal("show")
        this.setState({
            nama: "",
            jumlahbeli: 0,
            harga: 0,
            total: 0,
            cover: "",
            action: "insert"
        })
    }
    Edit = (item) => {
        $("#modal_belanja").modal("show")
        this.setState({
            nama: item.nama,
            jumlahbeli: item.jumlahbeli,
            harga: item.harga,
            total: item.total,
            cover: item.cover,
            action: "update",
            selectedItem: item
        })
    }
    Save = (event) => {
        event.preventDefault();
        //menampung data belanja
        let tempbelanja = this.state.belanja
        if (this.state.action === "insert") {
            tempbelanja.push({
                nama: this.state.nama,
                jumlahbeli: this.state.jumlahbeli,
                harga: this.state.harga,
                total: this.state.total,
                cover: this.state.cover
            })
        } else if (this.state.action === "update") {
            let index = tempbelanja.indexOf(this.state.selectedItem)
            tempbelanja[index].nama = this.state.nama
            tempbelanja[index].jumlahbeli = this.state.jumlahbeli
            tempbelanja[index].harga = this.state.harga
            tempbelanja[index].total = this.state.total
            tempbelanja[index].cover = this.state.cover
        }
        this.setState({ belanja: tempbelanja })
        $("#modal_belanja").modal("hide")
    }
    Drop = (item) => {
        //beri konfirmasi
        if (window.confirm("apakah anda akan menghapus data ini??")) {
            //menghapus data
            let tempbelanja = this.state.belanja
            //tau posisi index
            let index = tempbelanja.indexOf(item)
            //splice untuk menghapus
            tempbelanja.splice(index, 1)

            this.setState({ belanja: tempbelanja })
        }
    }
    setUser = () => {
        // cek eksistensi dari session storage
        if (sessionStorage.getItem("user") === null) {
            let prompt = window.prompt("Masukan Nama Anda", "")
            if (prompt === null || prompt === "") {
                //Jika user tidak mengisikan namanya
                this.setUser()
            } else {
                //Jika user telah mengisikan namanya
                //simpan nama user ke session storage
                sessionStorage.setItem("user", prompt)
                // simpan nama user ke statenya
                this.setState({ user: prompt })
            }
        } else {
            //Kondisi saat User telah dibuat
            //akses nilai dari session storage
            let name = sessionStorage.getItem("user")
            this.setState({ user: name })
        }
    }
    componentDidMount() {
        this.setUser()
    }
    addToCart = (selectedItem) => {
        // membuat sebuah variabel untuk menampung cart sementara
        let tempCart = []

        // cek eksistensi dari data cart pada localStorage
        if (localStorage.getItem("cart") !== null) {
            tempCart = JSON.parse(localStorage.getItem("cart"))
            // JSON.parse() digunakan untuk mengonversi dari string -> array object
        }

        // cek data yang dipilih user ke keranjang belanja
        let existItem = tempCart.find(item => item.nama === selectedItem.nama)

        if (existItem) {
            // jika item yang dipilih ada pada keranjang belanja
            window.alert("Anda telah memilih item ini")
        } else {
            // user diminta memasukkan jumlah item yang dibeli
            let promptJumlah = window.prompt("Masukkan jumlah item yang beli", "")
            if (promptJumlah !== null && promptJumlah !== "") {
                // jika user memasukkan jumlah item yg dibeli

                // menambahkan properti "jumlahBeli" pada item yang dipilih
                selectedItem.jumlahbeli = promptJumlah

                // masukkan item yg dipilih ke dalam cart
                tempCart.push(selectedItem)

                // simpan array tempCart ke localStorage
                localStorage.setItem("cart", JSON.stringify(tempCart))
            }
        }
    }


    render() {
        return (
            <div className="container">
                <h4 className="text-danger my-2">
                    Nama Pengguna: {this.state.user}
                </h4>
                <input type="text" className="form-control my-2" placeholder="Pencarian"
                    value={this.state.keyword}
                    onChange={ev => this.setState({ keyword: ev.target.value })}
                    onKeyUp={ev => this.searching(ev)}
                />

                <div className="row">
                    {this.state.belanja.map((item, index) => (
                        <CardBelanja
                            nama={item.nama}
                            jumlahbeli={item.jumlahbeli}
                            harga={item.harga}
                            total={item.total}
                            cover={item.cover}
                            onEdit={() => this.Edit(item)}
                            onDrop={() => this.Drop(item)}
                            onCart={() => this.addToCart(item)}
                        />
                    ))}
                    <button className="btn btn-info btn-block form-control" onClick={() => this.Add()}>Tambah Data</button>
                    <Cart />
                </div>
                <div className="modal" id="modal_belanja">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">Form Data</div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.Save(ev)}>
                                    Nama Barang:
                                  <input type="text" className="form-control mb-2" value={this.state.nama} onChange={ev => this.setState({ nama: ev.target.value })} required />
                                    Jumlah Beli:
                                  <input type="number" className="form-control mb-2" value={this.state.jumlahbeli} onChange={ev => this.setState({ jumlahbeli: ev.target.value })} required />
                                    Harga:
                                  <input type="number" className="form-control mb-2" value={this.state.harga} onChange={ev => this.setState({ harga: ev.target.value })} required />
                                  Total Harga:
                                  <input type="number" className="form-control mb-2" value={this.state.total} onChange={ev => this.setState({ total: ev.target.value })} required />
                                  Cover Barang:
                                  <input type="url" className="form-control mb-2" value={this.state.cover} onChange={ev => this.setState({ cover: ev.target.value })} required />
                                    <button className="btn btn-success form-control" type="submit"> Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Belanja;