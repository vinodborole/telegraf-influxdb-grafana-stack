const grafanaUrl = `${process.env.REACT_APP_GRAFANA_URL}`;

const grafanaSourceSnap = {
  cpuusage: {
    src: `${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&panelId=61861`,
  },
  ramusage: {
    src: `${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&panelId=61860`,
  },
  swapusage: {
    src: `${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&panelId=61863`,
  },
  rootfs: {
    src: `${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&panelId=61864`,
  },
};

const grafanaGraphSnap = {
  cpuusage: {
    src: `${grafanaUrl}/d-solo/000000128/telegraf-system-dashboard?orgId=1&panelId=28239`,
  },
};

export const getGrafanaSourceSnapshot = () => grafanaSourceSnap;
export const getGrafanaGraphSnapshot = () => grafanaGraphSnap;
