defmodule CncfDashboardApi.PageController do
  use CncfDashboardApi.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
