
require 'byebug'
require 'capybara/cucumber'
# require 'selenium-webdriver'
require 'uri'
require 'coffee'
require 'selenium'
require 'selenium-webdriver'
# $LOAD_PATH.unshift(File.dirname(__FILE__) + '/../../lib')
Capybara.register_driver :chrome do |app|
  client = Selenium::WebDriver::Remote::Http::Default.new
  client.read_timeout = 120
  Capybara::Selenium::Driver.new(app, :browser => :chrome, http_client: client)
end
Capybara.default_driver = :chrome
Capybara.javascript_driver = :chrome
Capybara.default_max_wait_time = 60

def log_message(msg1, msg2="")
  puts msg1.to_s + " " + msg2
end

if $headless_server.nil?
  if !ENV['IN_BROWSER']
    require 'headless'
    # allow display autopick (by default)
    # allow each headless to destroy_at_exit (by default)
    # allow each process to have their own headless by setting reuse: false
    # $headless_server = Headless.new(reuse: true)
    $headless_server = Headless.new(reuse: true, destroy_at_exit: false)
    $headless_server.start

    log_message("Process[#{Process.pid}] started headless server display: #{$headless_server.display}")
    log_message(Capybara.default_driver, "default driver" + "######################################")
  end
end


at_exit do
  unless $headless_server.nil?
    log_message("Process[#{Process.pid}] destroying headless server on display: #{$headless_server.display}")
    $headless_server.destroy
  end
end
