import {defineStore} from 'pinia'
import axios from 'axios'
import {getToken} from '@/common/token'

const {VITE_API_URL, VITE_API_PATH} = import.meta.env;
export const adminProductStore = defineStore('adminProductStore', {
    state: () => ({
        products: [],
        selectedProduct: {
            category: '',
            content: '',
            description: '',
            id: '',
            imageUrl: '',
            imagesUrl: [],
            is_enabled: 0,
            origin_price: 0,
            price: 0,
            title: '',
            unit: '單位',
            num: 0,
            rating: 0
        },
        pagination: {
            total_pages: 1,
            current_page: 1
        },
        isNew: true
    }),
    getters: {},
    actions: {
        async getProducts(page = 1) {
            try {
                const {data} = await axios.get(
                    `${VITE_API_URL}/api/${VITE_API_PATH}/admin/products?page=${page}`,
                    {headers: {Authorization: `${getToken()}`}}
                )
                this.products = data.products
                this.pagination = data.pagination
            } catch (e) {
                alert(e.response.data.message)
            }
        },
        selectProduct(product) {
            this.selectedProduct = product
        },
        clearProduct() {
            this.selectedProduct = {
                category: '',
                content: '',
                description: '',
                id: '',
                imageUrl: '',
                imagesUrl: [],
                is_enabled: 0,
                origin_price: 0,
                price: 0,
                title: '',
                unit: '單位',
                num: 0,
                rating: 0
            }
        },
        setIsNew(isNew) {
            this.isNew = isNew
        }
    }
})
