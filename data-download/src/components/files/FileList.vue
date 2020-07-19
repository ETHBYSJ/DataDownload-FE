<template>
  <div v-if="listInfo.items.length === 0">

  </div>
  <div v-else id="listing">
    <!--标题-->
    <div class="header">

    </div>
    <div>
      <ListingItem v-for="(item) in listInfo.items"
        :name="item.name"
        :size="item.size"
        :isDir="item.isDir"
        :path="item.path"
        :modified="item.modified"
        :ownerId="item.ownerId"
        :share="item.share"
        :key="item.name"
        v-on:delete="onDelete">
      </ListingItem>
    </div>
  </div>

</template>

<script>
  import ListingItem from "./ListingItem";
  export default {
    name: 'FileList',
    props: {
      listInfo: {
        type: Object,
        default: () => ({items: [], numDirs: 0, numFiles: 0})
      }
    },
    components: {
      ListingItem
    },
    data() {
      return {

      }
    },
    methods: {
      onDelete() {
        // console.log("ondelete")
        this.$emit('delete')
      }
    },
    computed: {

    }
  }
</script>

<style lang="less" scoped>

</style>
