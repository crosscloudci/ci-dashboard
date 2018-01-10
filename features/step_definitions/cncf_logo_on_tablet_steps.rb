require 'byebug'
Given /that a user is on the CNCF CI Status Dashboard on tablet view/ do
  visit ENV["TEST_URL"]
	expect(page).to have_current_path(ENV["TEST_URL"])
end

When /the user clicks on the CNCF logo url on tablet view/ do
  visit ENV["TEST_URL"]
  sleep 1
  #size for ipad screen
	page.driver.browser.manage.window.resize_to(1024, 768)
	 @cncf_projects_window = window_opened_by do
		page.find("#dashboard-logo").find(".cncf-logo").click
	 end
end

Then /a new tab will open on a tablet sized browser for https\:\/\/cncf\.io/ do
	within_window @cncf_projects_window do
		expect(page).to have_content('CLOUD NATIVE COMPUTING FOUNDATION')
	end 
end
