<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col col-7">
        <h1>
          {{ recipeId }}
        </h1>
        <h1>
          Kanasupp
        </h1>
        <div class="d-flex gap-2">
          <font-awesome-icon :icon="['far', 'clock']" size="lg"/>
          <h6>
            1 h 30 min
          </h6>
        </div>
        <h5 class="mt-3">
          Koostisosad
        </h5>
        <ul class="list-group list-group-flush w-50">
          <li class="list-group-item">1 kg koostisosa</li>
          <li class="list-group-item">1 kg koostisosa</li>
          <li class="list-group-item">1 kg koostisosa</li>
          <li class="list-group-item">1 kg koostisosa</li>
        </ul>
        <h5 class="mt-3">
          Valmistamine
        </h5>
        <p class="w-75">
          Sega koostisosad omavahel suures kausis, tagades ühtlase segu. Seejärel kuumuta segu mõõdukal kuumusel, kuni saavutad soovitud konsistentsi. Järgmise sammuna vala segu ettevalmistatud vormidesse ja aseta need ahju või külmikusse vastavalt retseptile. Lõpuks serveeri maitserikast rooga oma lemmiknõudel ja naudi!
        </p>
      </div>
      <div class="col-5">
        <img src="@/assets/recipethumbnail.png">
      </div>
    </div>
  </div>
</template>
<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";

export default {
  name: 'RecipeView',
  components: {FontAwesomeIcon},
  props: {
    recipeId: 0,
    recipeName: String,
  },
  data() {
    return {

    }
  },
  methods: {
},
  mounted() {
    {
      // const id = this.$route.params.id;
    //   todo get 1 retsept selle id järgi ära ja siis täida väljad vajaliku infoga
    }
  }
}
</script>
