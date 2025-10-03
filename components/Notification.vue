<template>
  <v-alert dense text :type="color" dismissible>
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: 'Notification',
  props: ['message', 'color']
}
</script>