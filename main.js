Vue.component('array-show-sizes', {
  props: {
    sizes: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="size in sizes">{{ size }}</li>
    </ul>
  `
})

Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
  <div class="product">

        <div class="header">
            <h1><span>{{header}}</span></h1>
            <p v-if="inStock">Поспішай, ще триває!</p>
            <p class="dedlain" v-else="inStock">На жаль, уже закінчився...</p>
        </div>

        <div class="product-card">

            <div class="product-image">
                <img v-bind:src="image" v-bind:alt="altText">
            </div>

            <div class="product-info">

                <h2>{{ title }}</h2>
                <p>{{ sale }}</p>
                <p>Shipping: {{ shipping }}</p>

                <div class="check">
                    <h3 v-if="inventory > 20"> Доступні розміри: </h3>
                    <h3 v-else-if="inventory <= 20 && inventory > 0"> Залишилось небагато пар. Доступні розміри:</h3>
                    <h3 v-else> Відсутні розміри. У новій колекції очікуються: </h3>
                </div>

                <array-show-sizes :sizes="sizes"></array-show-sizes>

                <a :href="link" target="_blank">Більше подібних продуктів</a>
                <p :class="{stockStatus: !inStock}"> В наявності: </p>

                <div class="cart">
                    <p>Cart({{ cart }})</p>
                </div>

                <button v-on:click="addToCart" :disabled="!inStock" 
                    :class="{ disabledButton: !inStock }">Add</button>
                <button v-on:click="minusFromCart" :disabled="!inCart"
                    :class="{ disabledButton: !inCart }">Remove</button>
                
                <p>Оберіть колір:</p>
                <div>
                    <div class="color-box" 
                        v-for="(variant, index) in variants" 
                        :key="variant.variantId"
                        :style="{ backgroundColor:variant.variantColor }"
                        @mouseover="updateProduct(index)"
                        >
                    </div>
                </div>

            </div>
        </div>

  </div>
  `,
data() {
  return {
      product: "Шкарпетки",
      brand: 'Vue Mastery',
      selectedVariant: 0,
      cart: 0,
      header: "Розпродаж",
      altText: "A pair of socks",
      description: "Пара теплих пухнастих шкарпеток",
      inventory: 100,
      sizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
      link: "https://www.amazon.com/s?k=socks&ref=nb_sb_noss",
      // inStock: true,
      inCart: false,
      variants: [
        {
          variantId: 2234,
          variantColor: "green",
          variantImage: "./image/vmGreen.jpg",
          variantQuantity: 1,
        },
        {
          variantId: 2235,
          variantColor: "gray",
          variantImage: "./image/1fbBlue.jpg",
          variantQuantity: 0,
        },
      ],
      onSale: true,
    }
  },

    methods: {
      addToCart() {
        this.cart += 1;
        this.inCart = true;
      },
      minusFromCart() {
        if (this.cart > 0) {
          this.cart -= 1;
        }
        if (this.cart == 0) {
          this.inCart = false;
        }
      },
      updateProduct: function (index) {
        this.selectedVariant = index;
      },
    },

    computed: {
      title() {
        return this.product + " " + this.brand;
      },
      image() {
        return this.variants[this.selectedVariant].variantImage;
      },
      inStock() {
        return this.variants[this.selectedVariant].variantQuantity;
      },
      sale() {
        if (this.onSale) {
          return this.description + " " + this.brand + " зігріють саме тебе!";
        }
        return this.description + " " + this.brand + " очікуються найближчим часом ;)";
      },
      shipping() {
        if (this.premium) {
          return "Free"
        }
          return "2.99$"
      },
    },
  })

  var app = new Vue({
    el: '#app',
    data: {
      premium: false
    }
})
