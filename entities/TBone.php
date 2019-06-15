<?php



/**
 * TBone
 */
class TBone
{
    /**
     * @var string
     */
    private $name;

    /**
     * @var string
     */
    private $commonname;

    /**
     * @var string
     */
    private $skeletaldivision;

    /**
     * @var string
     */
    private $descriptionof;

    /**
     * @var string
     */
    private $location;

    /**
     * @var string
     */
    private $numberof;

    /**
     * @var string
     */
    private $articulation;

    /**
     * @var string
     */
    private $bonestatus = 'Draft';

    /**
     * @var string
     */
    private $boneowner = '';

    /**
     * @var integer
     */
    private $boneid;


    /**
     * Set name
     *
     * @param string $name
     *
     * @return TBone
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set commonname
     *
     * @param string $commonname
     *
     * @return TBone
     */
    public function setCommonname($commonname)
    {
        $this->commonname = $commonname;

        return $this;
    }

    /**
     * Get commonname
     *
     * @return string
     */
    public function getCommonname()
    {
        return $this->commonname;
    }

    /**
     * Set skeletaldivision
     *
     * @param string $skeletaldivision
     *
     * @return TBone
     */
    public function setSkeletaldivision($skeletaldivision)
    {
        $this->skeletaldivision = $skeletaldivision;

        return $this;
    }

    /**
     * Get skeletaldivision
     *
     * @return string
     */
    public function getSkeletaldivision()
    {
        return $this->skeletaldivision;
    }

    /**
     * Set descriptionof
     *
     * @param string $descriptionof
     *
     * @return TBone
     */
    public function setDescriptionof($descriptionof)
    {
        $this->descriptionof = $descriptionof;

        return $this;
    }

    /**
     * Get descriptionof
     *
     * @return string
     */
    public function getDescriptionof()
    {
        return $this->descriptionof;
    }

    /**
     * Set location
     *
     * @param string $location
     *
     * @return TBone
     */
    public function setLocation($location)
    {
        $this->location = $location;

        return $this;
    }

    /**
     * Get location
     *
     * @return string
     */
    public function getLocation()
    {
        return $this->location;
    }

    /**
     * Set numberof
     *
     * @param string $numberof
     *
     * @return TBone
     */
    public function setNumberof($numberof)
    {
        $this->numberof = $numberof;

        return $this;
    }

    /**
     * Get numberof
     *
     * @return string
     */
    public function getNumberof()
    {
        return $this->numberof;
    }

    /**
     * Set articulation
     *
     * @param string $articulation
     *
     * @return TBone
     */
    public function setArticulation($articulation)
    {
        $this->articulation = $articulation;

        return $this;
    }

    /**
     * Get articulation
     *
     * @return string
     */
    public function getArticulation()
    {
        return $this->articulation;
    }

    /**
     * Set bonestatus
     *
     * @param string $bonestatus
     *
     * @return TBone
     */
    public function setBonestatus($bonestatus)
    {
        $this->bonestatus = $bonestatus;

        return $this;
    }

    /**
     * Get bonestatus
     *
     * @return string
     */
    public function getBonestatus()
    {
        return $this->bonestatus;
    }

    /**
     * Set boneowner
     *
     * @param string $boneowner
     *
     * @return TBone
     */
    public function setBoneowner($boneowner)
    {
        $this->boneowner = $boneowner;

        return $this;
    }

    /**
     * Get boneowner
     *
     * @return string
     */
    public function getBoneowner()
    {
        return $this->boneowner;
    }

    /**
     * Get boneid
     *
     * @return integer
     */
    public function getBoneid()
    {
        return $this->boneid;
    }
}

