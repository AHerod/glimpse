import $ from 'jquery';
import { ControlsPanel } from './globals'

$('.controls-panel').on('click', function(){
  ControlsPanel.cameraView === 'onePoint' ? ControlsPanel.cameraView = 'twoPoint' : ControlsPanel.cameraView = 'onePoint';
});
