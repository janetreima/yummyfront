<template>
  <h4>
    Filtreeri
  </h4>
  <div class="mt-3">
    <h5>
      Käik
    </h5>
    <div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="">
        <label class="form-check-label" for="flexCheckDefault">
          Supp
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="">
        <label class="form-check-label" for="flexCheckChecked">
          Praad
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="">
        <label class="form-check-label" for="flexCheckChecked">
          Magustoit
        </label>
      </div>
    </div>
  </div>
  <div class="mt-3">
    <button type="button" class="btn btn-outline-dark">Filtreeri</button>
  </div>
</template>

<script>
export default {
  name: 'Filter',
  data() {
    return {}
  },
}
</script>