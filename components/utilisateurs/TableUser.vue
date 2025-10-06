<template>
  <div>
    <div class="d-flex border-bottom-solid">
      <div>
        <v-tabs v-model="tab">
          <v-tab class="text-normal" v-for="item in tabItems" :key="item.value" @click="updateTotalPage(item.value)">
            {{ item.title }}</v-tab>
        </v-tabs>
      </div>
      <div class="ml-auto p-2">
        <v-btn depressed rounded color="primary" @click="goToAddUser">
          <v-icon left>
            mdi-plus
          </v-icon>
          Nouvel utilisateur
        </v-btn>
      </div>
    </div>
    <v-card-title class="col-12">
      <template>
        <v-form class=" mt-5 row" v-model="valid" ref="form" enctype="multipart/form-data">
          <v-col md="6" lg="6" sm="12" class="mb-0 pb-0 d-flex">
            <v-text-field ref="inputRef" label="Rechercher un utilisateur" class="mt-5" outlined dense
              v-model="model.dataSearch" placeholder="Email, Prénom, Nom" clearable :clear-icon-cb="onClearClicked"
              rounded></v-text-field>

          </v-col>

          <v-col lg="6" md="6" sm="12" class="d-flex">
            <v-btn :loading="loading" :disabled="!valid" class="mt-5 mr-4 text-white" color="secondary"
              @click="submitForm" depressed rounded>
              Rechercher
            </v-btn>
            <v-btn class="mt-5" text @click="onClearClicked" rounded color="red">Réinitialiser</v-btn>
          </v-col>
        </v-form>
      </template>
    </v-card-title>
    <v-data-table v-model="selected" :headers="headers" :items="filteredUsers" :single-select="singleSelect"
      item-key="id" :items-per-page="perpage" class="flat pt-4" :loading="progress"
      loading-text="Chargement... Patientez svp" hide-default-footer :search="search" :style="'cursor: pointer'"
      @click:row="visualiserItem">
      <template v-slot:top="{ }">
        <v-row class="mb-1 border-bottom-small d-flex">
          <v-col md="6" sm="12" lg="6" class="pb-0 pt-4">
            <div class="row">
            </div>
          </v-col>
          <v-col md="6" sm="12" lg="6" class="pt-0 pb-2 align-right-pagination">
            <v-pagination v-model="page" :length="totalpage" total-visible="6" next-icon="mdi-menu-right"
              prev-icon="mdi-menu-left" @input="handlePageChange"></v-pagination>
          </v-col>
          <div class="text-center">
            <v-dialog persistent v-model="dialog" width="500">
              <v-card>
                <v-card-title class="text-h5"> Confirmation </v-card-title>
                <v-card-text>Voulez-vous supprimer cet élément ?</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary darken-1" text @click="dialog = false" outlined>
                    Annuler
                  </v-btn>
                  <v-btn color="red darken-1" text @click="deleteItem" outlined>
                    Supprimer définitivement
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-row>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div @click.stop>
          <v-switch :input-value="item.status == 'active'" color="success" hide-details
            @change="activeDesactiveUser(item.id)"></v-switch>
        </div>
      </template>

      <template v-slot:[`item.roles`]="{ item }">
        <v-chip color="primary" small outlined class="my-1 mr-1" v-for="role in item.roles" :key="role.value">
          {{ role.description }}
        </v-chip>
      </template>
      <template v-slot:[`item.secteur`]="{ item }">
        <p class="pt-4" v-for="secteur in item.secteur" :key="secteur.id">
          {{ secteur.libelle }}
        </p>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>

          <v-list shaped>
            <v-item-group>
              <v-list-item @click="visualiserItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon small class="mr-2">
                    mdi-information-outline
                  </v-icon>Détail
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="editItem(item)" link class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon small class="mr-2"> mdi-pencil-outline </v-icon>Modifier
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="opendialog(item)"
                class="custom-v-list-action pl-2 pr-1">
                <v-list-item-title>
                  <v-icon small class="mr-2">
                    mdi-delete-outline </v-icon>Supprimer
                </v-list-item-title>
              </v-list-item>
            </v-item-group>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {

  mounted() {
    this.getList(1);
  },
  computed: {
    ...mapGetters({
      listUsers: 'utilisateurs/listutilisateurs',
      headers: 'utilisateurs/headerutilisateurs',
      totalpage: 'utilisateurs/totalpage',
      perpage: 'utilisateurs/perpage',
      datasearch: 'utilisateurs/datasearch',
    }),
    filteredUsers() {
      return this.listUsers.filter(user => (!user.roles.filter(item => (item.name == 'super_admin')).length > 0))
    }
  }
  ,
  props: ['tab'],
  metaInfo() {
    return {
      tab: this.tab,
    }
  },
  methods: {
    submitForm() {
      this.currentTab = ''
      this.page = 1
      this.loadingTotal = true;
      let validation = this.$refs.form.validate()
      this.loading = true;
      this.$store.commit('utilisateurs/initdatasearch', this.model.dataSearch)
      validation && this.getResult(1, this.model.dataSearch)
    },
    onClearClicked() {
      this.page = 1
      this.loadingTotal = true
      this.model.dataSearch = null
      this.$store.commit('utilisateurs/initdatasearch', this.model.dataSearch)
      this.$refs.inputRef.clearableCallback()
      this.getList(1)
    },
    updateTotalPage(value) {
      this.loadingTotal = true
      this.page = 1
      this.currentTab = value
      this.progress = true
      this.$mrvciApi.$get('/users?status=' + value + '&page=' + 1)
        .then(async (response) => {
          this.total = response?.pagination?.total
          this.$store.dispatch('utilisateurs/getTotalPage', response?.pagination?.total_pages)
          this.$store.dispatch('utilisateurs/getPerPage', response?.pagination?.per_page)
          this.$store.dispatch('utilisateurs/getList', response?.data)
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {
          this.loadingTotal = false
          this.progress = false
        });

    },
    getList(page) {
      this.progress = true
      this.$mrvciApi.$get('/users?status=' + this.currentTab + '&page=' + page)
        .then(async (response) => {
          this.total = response?.pagination?.total
          this.$store.dispatch('utilisateurs/getTotalPage', response?.pagination?.total_pages)
          this.$store.dispatch('utilisateurs/getPerPage', response?.pagination?.per_page)
          this.$store.dispatch('utilisateurs/getList', response?.data)
        }).catch((error) => {
          this.$toast.error(error?.response?.data?.message).goAway(5000)

        }).finally(() => {
          this.loadingTotal = false
          this.progress = false
        });
    },
    getResult(page, param) {
      this.tab = ''
      this.loadingTotal = true
      this.progress = true
      this.$mrvciApi.get('/user-multiple-search/' + param + '?page=' + page + '&status=' + this.currentTab)
        .then(async (response) => {
          this.total = response?.pagination?.total
          await this.$store.dispatch('utilisateurs/getList', response.data.data.data)
          this.$store.dispatch('utilisateurs/getTotalPage', response.data.data.last_page)
          this.$store.dispatch('utilisateurs/getPerPage', response.data.data.per_page)
        }).catch((error) => {

        }).finally(() => {
          this.loadingTotal = false
          this.loading = false;
          this.progress = false;
        });
    },
    activeDesactiveUser(id) {
      this.dialog = false
      this.$store.dispatch('toast/getMessage', { type: 'processing', text: 'Traitement en cours ...' })
      this.$mrvciApi.$get('/active_user/' + id)
        .then(async (response) => {
          this.$store.dispatch('toast/getMessage', { type: 'success', text: response?.message || 'Activation/Désactivation réussie' })
        }).catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Opération échouée' })
        }).finally(() => {

        });
    },
    handlePageChange(value) {

      this.getList(value)
    },
    visualiserItem(item) {
      this.$store.dispatch('utilisateurs/getDetail', item)
      this.$router.push('/utilisateurs/detail/?id=' + item.id);
    },
    editItem(item) {
      this.$store.dispatch('utilisateurs/getDetail', item)
      this.$router.push('/utilisateurs/modifier/' + item.id);
    },
    async deleteItem() {
      this.dialog = false
      this.$store.dispatch('toast/getMessage', { type: 'processing', text: 'Traitement en cours ...' })
      this.$mrvciApi.$delete('/users/' + this.activeItem.id)
        .then(async (response) => {
          this.$store.dispatch('utilisateurs/deleteUtilisateur', this.activeItem.id)
          this.$store.dispatch('toast/getMessage', { type: 'success', text: response?.message || 'Suppression réussie' })
        }).catch((error) => {
          this.$store.dispatch('toast/getMessage', { type: 'error', text: error || 'Échec de la suppression' })
        }).finally(() => {

        });
    },
    opendialog(item) {
      this.dialog = true
      this.activeItem = item
    },
    goToAddUser() {
      this.$router.push('/utilisateurs/addUser');
    },
  },
  data: () => ({
    valid: false,
    singleSelect: false,
    loading: false,
    loadingTotal: true,
    model: {
      dataSearch: '',
    },
    rules: {

    },
    currentTab: '',
    tabItems: [
      { title: 'Tous', value: '' },
      { title: 'Actifs', value: 'active' }, { title: 'Inactifs', value: 'inactive' },
    ],
    status: ['active', 'inactive'],
    dialog: false,
    progress: true,
    selected: [],
    search: '',
    items: [],
    page: 1,
    itemsPerPage: '',
    activeItem: {}
  })
}
</script>
<style scoped>
.circle-number {
  font-size: 16px;
  color: white;
  background-color: #7e4f25;
  padding: 5px;
  padding-right: 10px;
  padding-left: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
}

.border-bottom-small {
  border-bottom: solid 1px #80808052;
}
</style>
