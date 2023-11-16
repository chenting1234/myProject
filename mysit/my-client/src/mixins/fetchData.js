import { Server_URL } from "@/serverUrl";
export default function (defaultValueData = null) {
  return {
    data() {
      return {
        isLoading: true,
        data: defaultValueData,
      };
    },
    async created() {
      const resp = await this.fetchData();
      if (resp.rows) {
        resp.rows = resp.rows.map((item) => {
          return {
            ...item,
            thumb: Server_URL + item.thumb,
            avatar: Server_URL + item.avatar,
          };
        });
      }
      this.data = resp;
      this.isLoading = false;
    },
  };
}
