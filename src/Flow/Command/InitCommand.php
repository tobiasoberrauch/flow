<?php

namespace Flow\Command;

use Flow\Package\BasePackage;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * Class InitCommand
 *
 * PHP Version 5
 *
 * @category  PHP
 * @package   Flow\Command
 * @author    Simplicity Trade GmbH <it@simplicity.ag>
 * @copyright 2014-2016 Simplicity Trade GmbH
 * @license   Proprietary http://www.simplicity.ag
 */
class InitCommand extends BaseCommand
{
	protected function configure()
	{
		$this
			->setName('init')
			->setDescription('Creates a basic flow.json file in current directory.')
			->setDefinition(array(
				new InputOption('name', null, InputOption::VALUE_REQUIRED, 'Name of the package'),
				new InputOption('description', null, InputOption::VALUE_REQUIRED, 'Description of package'),
				new InputOption('author', null, InputOption::VALUE_REQUIRED, 'Author name of package'),
				new InputOption('type', null, InputOption::VALUE_OPTIONAL, 'Type of package (e.g. library, project, metapackage, flow-plugin)'),
				new InputOption('homepage', null, InputOption::VALUE_REQUIRED, 'Homepage of package'),
				new InputOption('require', null, InputOption::VALUE_IS_ARRAY | InputOption::VALUE_REQUIRED, 'Package to require with a version constraint, e.g. foo/bar:1.0.0 or foo/bar=1.0.0 or "foo/bar 1.0.0"'),
				new InputOption('require-dev', null, InputOption::VALUE_IS_ARRAY | InputOption::VALUE_REQUIRED, 'Package to require for development with a version constraint, e.g. foo/bar:1.0.0 or foo/bar=1.0.0 or "foo/bar 1.0.0"'),
				new InputOption('stability', 's', InputOption::VALUE_REQUIRED, 'Minimum stability (empty or one of: ' . implode(', ', array_keys(BasePackage::$stabilities)) . ')'),
				new InputOption('license', 'l', InputOption::VALUE_REQUIRED, 'License of package'),
				new InputOption('repository', null, InputOption::VALUE_REQUIRED | InputOption::VALUE_IS_ARRAY, 'Add custom repositories, either by URL or using JSON arrays'),
			))
			->setHelp(<<<EOT
The <info>init</info> command creates a basic flow.json file
in the current directory.

<info>php flow.phar init</info>

EOT
			);
	}

	protected function execute(InputInterface $input, OutputInterface $output)
	{
		$options = $input->getOptions();
	}
}
