<template>
	<section>
		<div id="controlPanel">
			<div v-if="buttonTimer > 0" id="countdown">
				{{buttonTimer}}
			</div>
			<div id="controls">
				<button @click="random" :disabled="buttonTimer > 0">Random</button>
				<button @click="similar" :disabled="buttonTimer > 0 || !started">Similar</button>
				<button @click="saving = !saving" :disabled="!started">Memorialize</button>
				<a @click="autoDownload">Click if a file downloaded plz</a>
			</div>
			<div id="saveInputs" v-if="saving">
				<label>What's Special?</label>
				<select v-model="selectedTopicId">
					<option v-for="topic in saveTopics" :value="topic.id">{{topic.text}}</option>
				</select>
				<label v-if="selectedTopicId">Note</label>
				<textarea v-model="note" v-if="selectedTopicId" placeholder="[optional]"></textarea>
				<button @click="save" :disabled="!selectedTopicId">Save</button>
			</div>
		</div>
		<div id="introCard" v-if="!started">
			<p>Controls in the upper right - other information in widget and @ under-construction.club.</p>
      <p>Back and forward buttons work as if you're on the site</p>
      <router-link to="memorial">Visit The Memorial</router-link>
      <pre>All pages hosted on <a href="http://www.oocities.org">oocities</a></pre>
		</div>
  		<iframe v-if="started" :src="iframeUrl" sandbox></iframe>
  		<u3c :config="this.u3c"></u3c>
	  </section>
</template>

<script>
import { db } from '../plugins/firebase.js'
import '../plugins/vue-easy-toast.js'
import '../plugins/lodash.js'
import '../plugins/u3c.js'

export default {
	name: 'home',
    metaInfo: {
        title: 'Let\'s Explore'
    },
	data () {
		return {
			activePage: {
			},
			saving: false,
			saved: false,
			started: false,
			saveReason: '',
			note: '',
			spelunker: '',
			reason: '',
			buttonTimer: 0,
			saveTopics: [{id: 0, text: 'dreams lived and interrupted'}, {id: 1, text: 'aestheticcccccccccccccc'}, {id: 2, text: 'different'}, {id: 3, text: 'obscure topic'}, {id: 4, text: 'tiny world'}, {id: 5, text: 'time capsule'}, {id: 6, text: 'fading out of existence'}, {id: 7, text: 'something else'}],
			selectedTopicId: '',
      u3c: {
        about: "I want to build a memorial to all the wonderful things that happened on geocities and the amazing way it flash froze. Geocities was taken offline in 2009 the decayed version you see when navigating is literally what was left.",
        instructions: 'Spend a little bit of time on each page - even the ones that seem broken or are just a list of files. Save it if you want.',
        next: "Just needed to get this out of my system so did this over a weekend. If people find it interesting enough will add to it.",
      }
		}
	},
    firebase: {
    	memorialized: db.ref('memorialized'),
    	midis: db.ref('midis'),
    	geoCities: db.ref('geoCitiesPages')
    },
    methods: {
    	random () {
    		var vue = this
    		this.started = true

    		var randomNode = _.random(0, this.geoCities.length - 1)
    		var randomSite = _.sample(this.geoCities[randomNode].sites)

    		let activePage = {
    			neighborhood: this.geoCities[randomNode].neighborhood,
    			neighborhoodIndex: randomNode,
    			about: this.geoCities[randomNode].about,
    			address: randomSite
    		}

    		this.activePage = activePage


    		this.buttonTimer = 15

    		let timer = setInterval(function() {
    			vue.buttonTimer -= 1

    			if(vue.buttonTimer === 0) {
    				clearInterval(timer)
    			}
    		}, 1000)


    	},
    	similar () {
    		var similarAddress = _.sample(this.geoCities[this.activePage.neighborhoodIndex].sites)
    		this.activePage.address = similarAddress

    		var vue = this
    		this.buttonTimer = 15

    		let timer = setInterval(function() {
    			vue.buttonTimer -= 1

    			if(vue.buttonTimer === 0) {
    				clearInterval(timer)
    			}
    		}, 1000)

    	},
    	save () {
    		let saveObject = {
    			note: this.note,
    			from: this.spelunker,
    			topicId: this.selectedTopicId,
    			neighborhood: this.activePage.neighborhood,
    			address: this.activePage.address,
          date: Date.now()
    		}

    		this.$firebaseRefs.memorialized.push(saveObject)
    		this.saving = false
    		this.saved = true
    		this.note = ''
    		this.saveReason = ''
	    	this.$toast('Saved', {horizontalPosition: 'right', duration: 3000, closeable: true})

    	},
    	autoDownload () {
    		this.$firebaseRefs.midis.push({url: this.activePage.neighborhood + '/' + this.activePage.address})
    	}
    },
    computed: {
    	iframeUrl () { return 'http://www.oocities.org/'+this.activePage.neighborhood+'/'+this.activePage.address}
    },
    mounted () {
    	this.spelunker = prompt('Welcome to Geocities Spelunkers. Who do you want to be?')
    }

}
</script>

<style lang="scss" scoped>
#controlPanel {
	z-index: 1;
	position: absolute;
	right: 30px;
	filter: invert(0%)
}

#saveInputs {
	margin-top: 20px;
}

#introCard {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 100px;
  padding-top: 200px;
}

select {
	display: block;
}

textarea {
	display: block;
	width: 80%;
	height: 60px;
}

label {
	font-size: 12px
}

iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
}

pre {
  margin-top: 80px;
}

a {
	margin-top: 10px;
	font-size: 12px;
	font-weight: 400;
	text-align: center;
	display: block;
	text-decoration: underline;
  cursor: pointer;
}

</style>
