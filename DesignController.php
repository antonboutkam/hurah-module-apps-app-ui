<?php
namespace AdminModules\Apps\App\Ui;

class DesignController extends \Core\MainController
{
    function run()
    {
        $this->addJsFile();

        $aDesignerTopNav = [];
        $aDesigner = [];

        return [
            'title' => '',
            'top_nav' => $this->parse('Apps/App/Ui/designer_top_nav.twig', $aDesignerTopNav),
            'content' => $this->parse('Apps/App/Ui/designer.twig', $aDesigner),
        ];
    }

}

