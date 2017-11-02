<template>
  <main>
    <router-link to="/">Find your own</router-link>
    <h1>GeoCities Memorial</h1>
    <div v-for="(topic, index) in memorialTopics">
      <h3>{{topic.text}}</h3>
      <ul>
        <li v-for="item in memorialized" v-if="item.topicId === index">
          <a :href="'http://www.oocities.org/'+item.neighborhood+'/'+item.address">{{item.neighborhood}}/{{item.address}}</a>
          <span v-if="item.note">Note: {{item.note}}</span>
          <span v-if="item.from">Found by: {{item.form}}</span>
        </li>
      </ul>
    </div>
    <u3c :config="this.u3c"></u3c>
  </main>
</template>

<script>
import { db } from '../plugins/firebase.js'
import '../plugins/u3c.js'

export default {

  name: 'memorial',
  metaInfo: {
  	title: 'Memorial'
  },
  data () {
    return {
      memorialTopics: [{id: 0, text: 'dreams lived and interrupted'}, {id: 1, text: 'aestheticcccccccccccccc'}, {id: 2, text: 'different'}, {id: 3, text: 'obscure topic'}, {id: 4, text: 'tiny world'}, {id: 5, text: 'time capsule'}, {id: 6, text: 'fading out of existence'}, {id: 7, text: 'something else'}],
      u3c: {
        about: "Some of the things we\'ve found on the geocities archive",
        instructions: 'Links takes you to page hosted on the oocities archive',
      }

    }
  },
  firebase: {
      memorialized: db.ref('memorialized').orderByChild('date'),
  }
}
</script>

<style lang="scss" scoped>
</style>
