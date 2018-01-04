require 'byebug'
Given /that a user is on any page of the CNCF CI Status Dashboard on desktop/ do
  visit ENV["TEST_URL"]
	expect(page).to have_current_path(ENV["TEST_URL"])
end

When /the user clicks on The Linux Foundation Projects logo/ do
  visit ENV["TEST_URL"]
	 @cncf_projects_window = window_opened_by do
		page.find("#top-banner").find(".linux-foundation-logo").click
	 end
end

Then /a new tab will open for https\:\/\/www\.linuxfoundation\.org\/projects\// do
	within_window @cncf_projects_window do
		expect(page).to have_content('The Linux Foundation')
	end 
end
