/* eslint-disable */
<template>
  <v-container grid-list-md text-xs-center>
    <!-- <v-layout row wrap> -->
    <v-layout row wrap>
      <!-- <v-flex xs12 sm6 md4 v-for="u in users" :key="u.id"> -->
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
        <v-toolbar color="pink" dark>
          <v-toolbar-side-icon></v-toolbar-side-icon>
          <v-toolbar-title>User List</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>search</v-icon>
          </v-btn>
          <v-btn icon
            fab
            @click="mdUp"
          >
            <v-icon>add</v-icon>
          </v-btn>
          <!-- <v-btn icon>
            <v-icon>check_circle</v-icon>
          </v-btn> -->
        </v-toolbar>
        <v-list three-line>
          <template v-for="(user, index) in users">
            <v-list-tile :key="index" avatar ripple @click="test">
              <v-list-tile-content>
                <v-list-tile-title>{{ index }}</v-list-tile-title>
                <v-list-tile-sub-title class="title text-xs-left pl-5">{{ user.name }}</v-list-tile-sub-title>
                <!-- <v-list-tile-sub-title class="text--primary">{{ user.name }}</v-list-tile-sub-title> -->
                <v-list-tile-sub-title class="text-xs-left ml-2 pl-5">{{ user.age }}</v-list-tile-sub-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-icon color="gray" @click="delDialogPopUp(user._id)">clear</v-icon>
                <v-btn flat color="orange" @click="putDialog(user)">modified</v-btn>
                <!-- <v-btn flat color="orange">delete</v-btn>
                <v-list-tile-action-text>{{ user.action }}</v-list-tile-action-text>
                <v-icon color="grey lighten-1">star_border</v-icon>  -->
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < users.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
      </v-card>
    </v-flex>
      <!-- <v-btn
        absolute
        dark
        fab
        top
        right
        color="pink"
        @click="mdUp"
      >
        <v-icon>add</v-icon>
      </v-btn> -->
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template> -->
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <!-- <v-flex xs12 sm6 md4>
                <v-text-field label="Legal first name*" required></v-text-field>
              </v-flex> -->
              <!-- <v-flex xs12 sm6 md4>
                <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
              </v-flex> -->
              <v-flex xs12 sm6 md4>
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                  v-model="userName"
                ></v-text-field>
              </v-flex>
              <!-- <v-flex xs12>
                <v-text-field label="Email*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Password*" type="password" required></v-text-field>
              </v-flex> -->
              <v-flex xs12 sm6>
                <v-select
                  :items="userAges"
                  label="Age*"
                  required
                  v-model="userAge"
                ></v-select>
              </v-flex>
              <!-- <v-flex xs12 sm6>
                <v-autocomplete
                  :users="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-flex> -->
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange" flat @click="putUser">modified</v-btn>
          <v-btn color="blue darken-1" flat @click.native="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="postUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialog2" persistent max-width="320">
      <v-card>
        <v-card-title class="headline">정말 삭제하시겠습니까?</v-card-title>
        <v-card-text>이 데이터는 완전히 지워지며 복구할 수 없습니다.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="completeDel">Yes</v-btn>
          <v-btn color="green darken-1" flat @click="dialog2 = false">No</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
    >
      {{ snackbarMsg }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      users: [],
      getModel: '',
      putModel: '',
      postModel: '',
      delModel: '',
      dialog: false,
      dialog2: false,
      userAges: [
      ],
      userAge: 0,
      userName: '',
      snackbar: false,
      snackbarMsg: '',
      putId: '',
      delId: ''
    }
  },
  mounted () {
    for (let i = 1; i < 100; i++) this.userAges.push(i)
    this.getUsers()
  },
  methods: {
    getReq () {
      axios.get('http://localhost:3000/api/user', {
        user: 'getMan'
      })
        .then((r) => {
        // this.users = r.data.users
          this.getModel = JSON.stringify(r.data)
        // console.log(r)
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    postReq () {
      axios.post('http://localhost:3000/api/user', {
        name: 'newname_01', age: 100
      })
        .then((r) => {
        // this.users = r.data.users
          this.postModel = JSON.stringify(r.data)
        // console.log(r)
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    putReq () {
      axios.put('http://localhost:3000/api/user', {
        user: 'putMan'
      })
        .then((r) => {
        // this.users = r.data.users
          this.putModel = JSON.stringify(r.data)
        // console.log(r)
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    delReq () {
      axios.delete(`http://localhost:3000/api/user`)
        .then((r) => {
        // this.users = r.data.users
          this.delModel = JSON.stringify(r.data)
        // console.log(r)
        })
        .catch((e) => {
          console.log(e.message)
        })
    },
    mdUp () {
      this.userName = ''
      this.userAge = ''
      this.dialog = true
    },
    postUser () {
      console.log(this.userName, this.userAge)
      this.dialog = false
      // this.popUp(this.userName)
      axios.post(`http://localhost:3000/api/user`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.popUp('사용자 등록 완료')
          this.getUsers()
          // this.postModel = JSON.stringify(r.data)
        })
        .catch((e) => {
          this.popUp(e.message)
          // console.log(e.message)
        })
    },
    getUsers () {
      axios.get(`http://localhost:3000/api/user`)
        .then((r) => {
        // this.users = r.data.users
          console.log(r.data.users)
          this.users = r.data.users
        // console.log(r)
        })
        .catch((e) => {
          this.popUp(e.message)
        })
    },
    popUp (msg) {
      this.snackbar = true
      this.snackbarMsg = msg
    },
    test () {
      this.btnColor = 'warning'
      // console.log('test done')
    },
    putUser () {
      this.dialog = false
      axios.put(`http://localhost:3000/api/user/${this.putId}`, {
        name: this.userName, age: this.userAge
      })
        .then((r) => {
          this.popUp('사용자 수정 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.popUp(e.message)
        })
    },
    delUser (id) {
      axios.delete(`http://localhost:3000/api/user/${id}`)
        .then((r) => {
          this.popUp('사용자 삭제 완료')
          this.getUsers()
        })
        .catch((e) => {
          this.popUp(e.message)
        })
    },
    putDialog (user) {
      this.dialog = true
      this.putId = user._id
      this.userName = user.name
      this.userAge = user.age
    },
    delDialogPopUp (id) {
      this.dialog2 = true
      this.delId = id
    },
    completeDel () {
      this.dialog2 = false
      this.delUser(this.delId)
    }
  }
}
</script>
