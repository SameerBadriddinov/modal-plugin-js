let fruits = [
    { id: 1, title: 'Apple', price: 20, img: 'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png' },
    { id: 2, title: 'Orange', price: 30, img: 'https://foodcity.ru/storage/products/October2018/6XZSr6ddCl6cxfo0UchP.jpg' },
    { id: 3, title: 'MAndarin', price: 40, img: 'https://static3.depositphotos.com/1000454/110/i/600/depositphotos_1107150-stock-photo-isolated-fresh-mandarin.jpg' },
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img class="card-img-top" style="height: 300px;" src="${fruit.img}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn='price' data-id="${fruit.id}">Помотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [{
            text: 'Закрыть',
            type: 'primary',
            handler() {
                priceModal.close()
            }
        }
    ]
})

// const confirmModal = $.modal({
//     title: 'Вы уверены?',
//     closable: true,
//     width: '400px',
//     footerButtons: [{
//             text: 'Отменить',
//             type: 'secondary',
//             handler() {
//                 priceModal.close()
//             }
//         },
//         {
//             text: 'Удалить',
//             type: 'danger',
//             handler() {
//                 priceModal.close()
//             }
//         }
//     ]
// })

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    
    if(btnType === 'price'){
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    }else if(btnType === 'remove'){
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
        // confirmModal.setContent(`
        //     <p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>
        // `)
        // confirmModal.open()
    }
})