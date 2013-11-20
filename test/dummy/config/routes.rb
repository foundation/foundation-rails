Dummy::Application.routes.draw do
  get "styleguide2/show"
  get "/styleguide" => "styleguide#show"
end