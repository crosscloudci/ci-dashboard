Given /that a user is on the CNCF CI Status Dashboard from a tablet device/ do
  visit ENV["TEST_URL"]
	expect(page).to have_current_path(ENV["TEST_URL"])
end

When /the user is on a tablet and clicks on the project logo\/name/ do
  visit ENV["TEST_URL"]
  sleep 1
  #size for ipad screen
	page.driver.browser.manage.window.resize_to(1024, 768)

  expect(first('.project-flag')).to have_content("Kubernetes")
	 @cncf_projects_window = window_opened_by do
     first('.project-flag').click
	 end
end

Then /a tab will open for the first project on a tablet device/ do
	within_window @cncf_projects_window do
		expect(page).to have_content('Production-Grade Container Scheduling and Management')
	end 
end
