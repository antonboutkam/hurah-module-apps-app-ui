<?php
namespace AdminModules\Apps\App\Ui;

use Core\Layout;

class DesignController extends \Core\MainController
{
    function __construct($aGet, $aPost)
    {
        Layout::setNavTopVisibility(true);
        Layout::setSidebarLeftVisibility(true);


        parent::__construct($aGet, $aPost);
    }

    function run()
    {
        $this->addJsFile('/vendor/grapesjs/dist/grapes.min.js');
        $this->addCssFile('/vendor/grapesjs/dist/css/grapes.min.css');

        $aDesignerTopNav = [];
        $aDesigner = [];

        return [
            'title' => '',
            'layout' => [
                'id' => 'flex',
                'class' => 'flex'
            ],
            'top_nav' => $this->parse('Apps/App/Ui/designer_top_nav.twig', $aDesignerTopNav),
            'content' => $this->parse('Apps/App/Ui/designer.twig', $aDesigner),
        ];
    }

}

