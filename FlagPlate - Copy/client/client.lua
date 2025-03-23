local toggled = false

local function toggleNuiFrame(shuldShow)
  local vehicles ={}
  local initalVehicles = {{
			Model = "Sultan",
			Plate = "3XAMPL3",
			Owner = "1",
			Reason = '1x',
      By = "A.J Loxley",
		},
		{
			Model = "Neon",
			Plate = "FastAF",
			Owner = "A.J Loxley",
			Reason = 'Paciffic bank & Hostage Taking',
      By = "A.J Loxley",
		}}
  if shouldShow == nil then toggled = not toggled else toggled = shouldShow end 
  local data = {show = toggled, vehicles = initalVehicles, name = "TestName123"}
  if toggled then 
  end
  SetNuiFocus(toggled, toggled)
  SendReactMessage('setData', data)
end

function dump(o)
  if type(o) == 'table' then
      local s = '{ '
      for k,v in pairs(o) do
          if type(k) ~= 'number' then k = '"'..k..'"' end
          s = s .. '['..k..'] = ' .. dump(v) .. ','
      end
      return s .. '} \n'
  else
      return tostring(o)
  end
end

RegisterCommand('show-nui', function()
  toggleNuiFrame()
  debugPrint('Show NUI frame')
end)
RegisterCommand('slider', function()
  SendReactMessage('setDataE', true)
  debugPrint('Show NUI frame')
end)

RegisterNUICallback('hideFrame', function(_, cb)
  toggleNuiFrame(false)
  debugPrint('Hide NUI frame')
  cb({})
end)

RegisterNUICallback('vehicleAdded', function(data)
  print(data)
end)
RegisterNUICallback('vehicleRemoved', function(data)
  print(data)
end)