<template>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" >
    <label class="form-check-label" for="flexCheckDefault">
      <slot name="formlabel">
        valik
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
}
</script>