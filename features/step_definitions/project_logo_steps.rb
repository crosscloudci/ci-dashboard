require 'byebug'
Given /that a user is on the CNCF CI Status Dashboard with a desktop view/ do
  visit ENV["TEST_URL"]
	expect(page).to have_current_path(ENV["TEST_URL"])
end

When /the user clicks on the project logo\/name/ do
  visit ENV["TEST_URL"]
  sleep 1
  expect(first('.project-flag')).to have_content("Kubernetes")
	 @cncf_projects_window = window_opened_by do
     first('.project-flag').click
	 end
end

Then /a new tab will open for the first project url/ do
	within_window @cncf_projects_window do
		expect(page).to have_content('Production-Grade Container Scheduling and Management')
	end 
end
