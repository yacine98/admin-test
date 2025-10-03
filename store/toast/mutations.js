export default {
    async initmessage(state, newmessage) {
        state.message = newmessage
        this.$toast.clear()
        if (newmessage.type === 'processing')
            await this.$toast.show(newmessage.text).goAway(4000)
        if (newmessage.type === 'success')
            await this.$toast.success(newmessage.text).goAway(4000)
        if (newmessage.type === 'error')
            await this.$toast.error(newmessage.text).goAway(4000)
    }
}