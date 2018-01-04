require 'byebug'
Given /that a user is on any page of the CNCF CI Status Dashboard on tablet/ do
  visit ENV["TEST_URL"]
	expect(page).to have_current_path(ENV["TEST_URL"])
end

When /the user clicks on The Linux Foundation Projects logo on tablet/ do
  visit ENV["TEST_URL"]
  #size for ipad screen
	page.driver.browser.manage.window.resize_to(1024, 768)
	 @cncf_projects_window_on_tablet = window_opened_by do
		page.find("#top-banner").find(".linux-foundation-logo").click
	 end
end

Then /a new tab will open on a tablet sized browser for https\:\/\/www\.linuxfoundation\.org\/projects\// do
	within_window @cncf_projects_window_on_tablet do
		expect(page).to have_content('The Linux Foundation')
	end 
end
