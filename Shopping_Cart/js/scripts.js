// Getting UI element
let product_list = document.querySelector('#productList');
let bag_items = document.querySelector('#bagItems');


// Event Listener
product_list.addEventListener('click', addToBag);
bag_items.addEventListener('click', removeFromBag);
document.addEventListener('DOMContentLoaded', showList)


// Class
class Product{
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
    
}

class LocalStorage{

    static getProductList(list){
        let product_list;
        if(localStorage.getItem(list)===null){
            product_list = [];
        }
        else{
            product_list = JSON.parse(localStorage.getItem(list));
        } 
        return product_list;
    }
    static saveProduct(product, list){
        let List = this.getProductList(list);
        List.push(product);
        localStorage.setItem(list, JSON.stringify(List));
    }
    
    static removeFromBag(product){
        let bagItems = this.getProductList('bagItems');

        bagItems.forEach((item, index)=>{
            if(item.name===product.name){
                bagItems.splice(index,1);
                localStorage.setItem('bagItems', JSON.stringify(bagItems));
            }
        });
    }
}


class UI{

    static show(product, list){
        let List = document.querySelector('#'+list);
        let row = document.createElement('tr');
        row.innerHTML = `
        <tr>
        <td>${product.name}</td>
        <td>${product.price}</td>
        </tr>`;
        let td = document.createElement('td');

        if(list==='productList'){
            let flage = false;
            let bagItems = LocalStorage.getProductList('bagItems');
            for(let i=0 ; i<bagItems.length ; i++){
                if(bagItems[i].name===product.name){
                    flage=true;
                    break;
                }
            }
            if(flage)
                td.innerHTML = `<td><a class="btn bg-secondary">Added</a></td>`;
            else
                td.innerHTML = `<td><a href="#" class="btn bg-primary">Add to Bag</a></td>`;
        }
        else
            td.innerHTML = `<td><a href="#" class="btn bg-danger">X</a></td>`;

        row.appendChild(td);
        List.appendChild(row);
    }

    static showList(list){
        let List = LocalStorage.getProductList(list);
        List.forEach(product=>{
            UI.show(product, list);
        });
    }

    static calculateTotalPrice(){
        let totalPrice = document.querySelector('#totalPrice');
        let bagItems = LocalStorage.getProductList('bagItems');
        let sum=0;
        for(let i=0 ; i<bagItems.length ; i++){
            sum+= parseInt(bagItems[i].price);
            console.log(sum, bagItems[i]);
        }
        totalPrice.innerText = sum; 
    }

    static showAlert(messege, alert){
        let div = document.querySelector('.container');
        let alert_div = document.createElement('div');
        alert_div.setAttribute('class', alert);
        alert_div.innerHTML = messege;
        div.insertBefore(alert_div, div.children[0]);

        setTimeout(()=>{
            document.querySelector(`.${alert}`).remove()
        },2000);
    }
}


// Functions
function addToBag(e){
    if(e.target.hasAttribute('href')){
        let item = e.target.parentElement.parentElement;
        let product = new Product(item.children[0].textContent, item.children[1].textContent);
        LocalStorage.saveProduct(product, 'bagItems');
        item.children[2].innerHTML = '<td><a class="btn bg-secondary">Added</a></td>'
        
        UI.show(product, 'bagItems');
        UI.calculateTotalPrice();
        UI.showAlert(`'${product.name}' is added to your <strong> order list</strong>`, 'success');
    }
}

function removeFromBag(e){
    if(e.target.hasAttribute('href')){
        let item = e.target.parentElement.parentElement;
        let product = new Product(item.children[0].textContent, item.children[1].textContent);
        LocalStorage.removeFromBag(product);
        item.remove();
        let productList = document.querySelector('#productList');
        let flage = true;
        let temp = productList.children[0];
        while(temp!=null){
            if(temp.children[0].textContent===product.name){
                temp.children[2].innerHTML = `<td><a href="#" class="btn bg-primary">Add to Bag</a></td>`;
                break;
            }
            temp = temp.nextElementSibling;
        }
        
        UI.calculateTotalPrice();
        UI.showAlert(`'${product.name}' is removed from your <strong> order list</strong>`, 'remove');
    }
}

function showList(){
    uploadData();
    UI.showList('productList');
    UI.showList('bagItems');
}

// upload predefined data of Product list to the Local storage
function uploadData(){
    if(localStorage.getItem('productData')===null){
        LocalStorage.saveProduct(new Product("Oil", 100),"productList");
        LocalStorage.saveProduct(new Product("Notebook", '50'),"productList");
        LocalStorage.saveProduct(new Product("Pen", 10),"productList");
        LocalStorage.saveProduct(new Product("Mineral Water", "25"),"productList");
        LocalStorage.saveProduct(new Product("Tissue", "70"),"productList");
        localStorage.setItem('productData',JSON.stringify("uploaded"));        
    }
}
