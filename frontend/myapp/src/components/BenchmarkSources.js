const host = "localhost";
const grafanaUrl = `http://${host}:3000`;

const grafanaSourceSnap = {
  cpuusage: {
    src: `${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&refresh=1m&from=1680168157524&to=1680171757524&panelId=61861`

  },
  ramusage: {
    src:`${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&refresh=1m&from=1680164303844&to=1680167903844&panelId=61860`
  },
  swapusage: {
    src:`${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&refresh=1m&from=1680164364517&to=1680167964517&panelId=61863`
  },
  rootfs: {
    src:`${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&refresh=1m&from=&to=&panelId=61866`
  },
  cpugraph:{
    src:`${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&refresh=1m&panelId=28239`
  }
};

export const getGrafanaSourceSnapshot = () => grafanaSourceSnap;
