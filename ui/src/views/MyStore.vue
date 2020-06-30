<template>
  <v-tabs>
    <v-tab>Продукти</v-tab>
    <v-tab>Замовлення</v-tab>

    <v-tab-item>

      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="products.list"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Додати новий</v-toolbar-title>
                <v-divider
                  class="mx-4"
                  inset
                  vertical
                ></v-divider>
                <v-spacer></v-spacer>
                <v-dialog v-model="dialog" max-width="500px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      dark
                      class="mb-2"
                      v-bind="attrs"
                      v-on="on"
                    >Створити
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">{{ formTitle }}</span>
                    </v-card-title>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field v-model="editedItem.name" label="Ім'я продукту"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field type="number" v-model="editedItem.price" label="Ціна продукту"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field v-model="editedItem.description" label="Опис продукту"></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-file-input v-model="editedItem.photo" label="Зображення продукту"></v-file-input>
                          </v-col>
                          <v-col cols="12">
                            <v-select
                              flat
                              v-model="editedItem.category"
                              :items="categories.list"
                              item-text="name"
                              item-value="_id"
                            ></v-select>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close">Скасувати</v-btn>
                      <v-btn color="blue darken-1" text @click="save">Зберегти</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>

    </v-tab-item>


    <v-tab-item>

      <v-container>
        <v-row>
          <v-col>
            <v-data-table
              :headers="orderHeaders"
              :items="productOwnerOrders.list"
            >
              <template v-slot:item.status="{ item }">
                <v-chip :color="getStatusColor(item.status)" dark>{{ getStatus(item.status) }}</v-chip>
              </template>

              <template v-slot:item.total_price="{ item }">
                <span>{{ item.total_price }} {{ currency }}</span>
              </template>

              <template v-slot:item.products="{ item }">
                <v-list>
                  <v-list-item text link :to="{ name: 'Product', params: { id: product._id } }"
                               v-for="product in item.products" :key="product._id">
                    <v-img max-width="75" :src="product.photo | concatWithAPI_URL"/>
                    <span>{{ product.name }}</span>
                  </v-list-item>
                </v-list>
              </template>

              <template v-slot:item.user="{ item }">
                <v-btn link text class="text-caption"  :to="{ name: 'Profile', params: { id: item.user._id } }">
                  {{ item.user.email }}
                </v-btn>
              </template>

              <template v-slot:item.actions="{ item }">
                <div v-if="item.status !== 1">
                  <v-icon
                    small
                    class="mr-2"
                    @click="acceptOrder(item)"
                    title="Прийняти замовлення"
                  >
                    mdi-check
                  </v-icon>
                  <v-icon
                    small
                    @click="declineOrder(item)"
                    title="Скасувати замовлення"
                  >
                    mdi-close
                  </v-icon>
                </div>
              </template>

            </v-data-table>
          </v-col>
        </v-row>
      </v-container>

    </v-tab-item>
  </v-tabs>
</template>

<script>
  import AuthService from '@/services/AuthService';
  import { mapGetters } from 'vuex';
  import { getStatus, getStatusColor, ORDER_CODE_STATUTES } from '@/utils/OrderStatusHelper';

  export default {
    name: 'MyStore',
    data: function () {
      return {
        dialog: false,
        headers: [
          {
            text: 'Ім\'я продукту',
            sortable: false,
            value: 'name',
          },
          {
            text: 'Категорія',
            sortable: false,
            value: 'category.name',
          },
          {
            text: 'Опис',
            sortable: false,
            value: 'description',
          },
          {
            text: 'Ціна',
            sortable: false,
            value: 'price',
          },
          { text: 'Дії', value: 'actions', sortable: false },

        ],
        orderHeaders: [
          {
            text: 'Кількість',
            sortable: false,
            value: 'total_amount',
          },
          {
            text: 'Кінцева ціна',
            sortable: false,
            value: 'total_price',
          },
          {
            text: 'Придбані продукти',
            sortable: false,
            value: 'products',
          },
          {
            text: 'Email',
            sortable: false,
            value: 'user'
          },
          {
            text: 'Дата замовлення',
            sortable: false,
            value: 'created_date',
          },
          {
            text: 'Статус',
            sortable: false,
            value: 'status',
          },
          {
            text: 'Дії',
            sortable: false,
            value: 'actions',
          },
        ],
        currency: 'грн',
        editedItem: {
          name: '',
          category: '',
          photo: null,
          price: 0,
          description: '',
        },
        defaultItem: {
          name: '',
          category: '',
          photo: null,
          price: 0,
          description: '',
        },
        editedIndex: -1,
      };
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Створити новий' : 'Редагувати';
      },
      ...mapGetters({
        categories: 'categories/getCategoryList',
        products: 'products/getProductOwnerProductList',
        productOwnerOrders: 'orders/getProductOwnerList',
      }),
    },
    methods: {
      getStatus,
      getStatusColor,
      deleteItem(item) {
        this.editedIndex = this.products.list.indexOf(item);
        this.$store.dispatch('products/remove', item._id)
          .then(() => this.getList());
      },
      editItem(item) {
        this.editedIndex = this.products.list.indexOf(item);
        this.editedItem = Object.assign({}, item);
        if (!(this.editedItem.photo instanceof Blob)) {
          delete this.editedItem.photo;
        }
        this.editedItem.category = this.editedItem.category._id;
        this.dialog = true;
      },
      getList() {
        const productOwner = AuthService.parseCurrentToken().id;
        this.$store.dispatch('products/pullProductListByProductOwner', productOwner);
      },
      close() {
        this.dialog = false;
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
      },
      save() {
        if (this.editedIndex > -1) {
          const id = this.editedItem._id;
          this.$store.dispatch('products/updateProduct', { id, raw: prepareRawProduct(this.editedItem) })
            .then((r) => {
              this.$store.dispatch('snackbar/show', 'Продукт оновлено');
              this.getList();
            });
        } else {
          this.$store.dispatch('products/createProduct', prepareRawProduct(this.editedItem))
            .then((r) => {
              this.$store.dispatch('snackbar/show', 'Продукт створено');
              this.getList();
            });
        }
        this.close();
      },
      acceptOrder(item) {
        this.$store.dispatch('orders/updateStatusOrder', {
          orderId: item._id,
          status: ORDER_CODE_STATUTES.ACCEPTED,
        });
      },
      declineOrder(item) {
        this.$store.dispatch('orders/updateStatusOrder', {
          orderId: item._id,
          status: ORDER_CODE_STATUTES.DECLINED,
        });
      },
    },
    created() {
      this.getList();
      this.$store.dispatch('categories/pullCategoryList');
      this.$store.dispatch('orders/pullProductOwnerOrders');
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
    },

  };

  function prepareRawProduct(obj) {
    const clone = { ...obj };
    const file = obj.photo;
    delete clone.photo;

    return file ? {
      fields: {
        ...clone,
      },
      file,
    } : {
      fields: {
        ...clone,
      },
    };
  }
</script>

<style scoped>

</style>
