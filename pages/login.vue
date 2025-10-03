<template>
  <form-login></form-login>
</template>

<script>
import FormLogin from '@/components/auth/FormLogin'
export default {
  layout: 'default',
  middleware({ redirect, $getToken, $getUser, $isLogged, $loggout }) {
    if ($getToken() != null & $getUser() != null & $isLogged() != null & $isLogged() != false) {
      return redirect('/dashboard')
    }
  },
  components: {
    FormLogin
  },
  data: () => ({
  }),
  methods: {}
};
</script>