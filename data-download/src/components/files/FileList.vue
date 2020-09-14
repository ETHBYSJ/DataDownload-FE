<template>
  <div v-if="listInfo.items.length === 0">

  </div>
  <div v-else id="listing">
    <!--标题-->
    <div class="header">

    </div>
    <div>
      <ListingItem v-for="(item) in listInfo.items"
        :file-id="item.id"
        :name="item.name"
        :size="item.size"
        :isDir="item.isDir"
        :path="item.path"
        :modified="item.modified"
        :ownerId="item.ownerId"
        :share="item.share"
        :key="item.name"
        :review="item.review"
        v-on:delete="onDelete"
        v-on:context-menu="emitContextMenu">
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
        this.$emit('delete')
      },
      // context-menu 消息中继
      emitContextMenu(fileId,e){
        this.$emit('context-menu',fileId,e)
      }
    },
    computed: {

    }
  }
</script>

<style lang="less" scoped>

</style>
